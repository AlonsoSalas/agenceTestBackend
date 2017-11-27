import Sequelize from 'sequelize';
import database from '../config/db';
import Bill from './Bills';

const ServiceOrder = database.sequelize.define('cao_os', {
  co_os: { type: Sequelize.INTEGER, primaryKey: true },
  co_usuario: Sequelize.STRING,
},{
  timestamps: false,
  underscored: true,
  freezeTableName: true
});

// ServiceOrder.belongsTo(Consultant, {foreignKey: 'co_usuario'});
ServiceOrder.hasMany(Bill, {foreignKey: 'co_os'});

export default ServiceOrder;
