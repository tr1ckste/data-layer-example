import { actorData } from './data';

(async () => {
  const actors = await actorData.findByYearAndLastName(
    2006,
    'Goldberg');

  console.log(actors);

  let count: number | null;

  count = await actorData.updateFirstNameByIds(
    'Parker',
    [-1, 0, -1, -1, 0]);

  console.log('Array update: ' + count);
})().then(() => console.log('DONE'));
