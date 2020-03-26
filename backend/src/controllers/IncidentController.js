const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const { page = 1 } = request.query;

        const [ count ] = await connection('incidents').count();

        const incidents = await connection('incidents') //Paginação. Mostrará apenas 5 itens por página
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
        .limit(5)
        .offset((page - 1) * 5)
        .select([
            'incidents.*',
            'ongs.name',
            'ongs.email',
            'ongs.whatsapp',
            'ongs.city',
            'ongs.uf'
        ]);

        response.header('X-Total-Count', count['count(*)']);

        return response.json(incidents);
    },

    async create(request, response) {
        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization;

        [ id ] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id
        });

        return response.json({ id });
    },

    async delete(request, response) {
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents')
        .where('id', id)
        .select('ong_id')
        .first();

        if (incident.ong_id !== ong_id) { //Comparando se o id que quer apagar é o id da ong que criou o incident
            return response.status(401).json({ error: 'Operation not permitted.'}); //Caso seja, sinalizar erro: usuário não tem autorização para fazer isso
        }

        await connection('incidents').where('id', id).delete();

        return response.status(204).send();
    }
};