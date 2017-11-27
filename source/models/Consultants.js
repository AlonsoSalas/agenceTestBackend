import Sequelize from 'sequelize';
import database from '../config/db';
import ServiceOrder from './ServiceOrders';
import Salary from './Salaries';

const Consultant = database.sequelize.define('cao_usuario', {
  co_usuario: { type: Sequelize.STRING, primaryKey: true },
  no_usuario: Sequelize.STRING,
},{
  timestamps: false,
  underscored: true,
  freezeTableName: true
});

Consultant.hasMany(ServiceOrder, {foreignKey: 'co_usuario'});
Consultant.hasMany(Salary, {foreignKey: 'co_usuario'});

export default Consultant;
