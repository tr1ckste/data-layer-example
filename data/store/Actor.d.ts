import { ActorDto } from '../dto/ActorDto'

export interface ActorData {
  findByYearAndLastName(
    year: number, lastName: string): Promise<ActorDto[]>

  updateFirstNameByIds(
    firstName: string, ids: number[]): Promise<number | null>
}
