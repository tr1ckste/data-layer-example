import { Pool, QueryResult } from 'pg';
import { ActorDto } from '../dto/ActorDto'

export class ActorData {
  #pool: Pool;

  constructor(pool: Pool) {
    this.#pool = pool;
  }

  async findByYearAndLastName(
    year: number, lastName: string): Promise<ActorDto[]> {
    const res =  await this.#pool.query(`
      SELECT a.actor_id,
        a.first_name,
        a.last_name,
        f.title,
        f.rental_rate,
        a.last_update
      FROM actor AS a
      INNER JOIN film_actor AS fa ON a.actor_id = fa.actor_id
      INNER JOIN film AS f ON fa.film_id = f.film_id
      WHERE f.release_year = $1 AND a.last_name = $2
    `, [year, lastName]);

    return ActorData.mapActorResult(res);
  }

  async updateFirstNameByIds(
    firstName: string, ids: number[]): Promise<number | null> {
    const res = await this.#pool.query(`
      UPDATE actor
      SET first_name = $1
      WHERE actor_id = ANY($2)
    `, [firstName, ids]);

    return res.rowCount;
  }

  private static mapActorResult =
    (res: QueryResult): ActorDto[] =>
      res.rows.map(r => ({
        actorId: r.actor_id,
        firstName: r.first_name,
        lastName: r.last_name,
        movie: r.title,
        rentalRate: r.rental_rate,
        lastUpdate: r.last_update
      }));
}
