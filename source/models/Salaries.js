import Sequelize from 'sequelize';
import database from '../config/db';

const Salary = database.sequelize.define('cao_salario', {
  co_usuario: { type: Sequelize.STRING, primaryKey: true },
  brut_salario: Sequelize.FLOAT,
  liq_salario: Sequelize.FLOAT,
},{
  timestamps: false,
  underscored: true,
  freezeTableName: true
});

// Salary.belongsTo(ServiceOrder, {foreignKey: 'co_os'});

export default Salary;
