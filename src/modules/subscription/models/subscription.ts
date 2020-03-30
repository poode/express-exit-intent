import { Table, Column, Model, CreatedAt, DataType, AutoIncrement, PrimaryKey, Unique, AllowNull,
        UpdatedAt } from 'sequelize-typescript';

@Table
export class Subscription extends Model<Subscription> {

  @AutoIncrement
  @PrimaryKey
  @Column
  id: string;

  @Unique
  @AllowNull(false)
  @Column(DataType.TEXT)
  email: string;

  @CreatedAt
  creationDate: Date;

  @UpdatedAt
  updatedAt: Date;
}
