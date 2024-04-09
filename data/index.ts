import { Pool, types } from 'pg';
import { ActorData } from './store/ActorData';

const connectionString = 'postgres://postgres:postgres@127.0.0.1:5432/dvdrental';

const pool = new Pool({
  connectionString
});

const NUMERIC_OID = 1700;

types.setTypeParser(NUMERIC_OID, (val) =>
  parseFloat(val)
);

export const actorData = new ActorData(pool);
