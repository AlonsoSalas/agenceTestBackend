import Sequelize from 'sequelize';
import database from '../config/db';

const Bill = database.sequelize.define('cao_fatura', {
  co_fatura: { type: Sequelize.INTEGER, primaryKey: true },
  co_os: Sequelize.INTEGER,
  valor: Sequelize.FLOAT,
  data_emissao: Sequelize.DATE,
  total_imp_inc: Sequelize.FLOAT,
  comissao_cn: Sequelize.FLOAT,
},{
  timestamps: false,
  underscored: true,
  freezeTableName: true
});

// Bill.belongsTo(ServiceOrder, {foreignKey: 'co_os'});

export default Bill;
