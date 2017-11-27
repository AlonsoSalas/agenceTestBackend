import ErrorHandler from '../handler/ErrorHandler';
import Consultant from '../models/Consultants';
import ServiceOrder from '../models/ServiceOrders';
import Bill from '../models/Bills';
import Salary from '../models/Salaries';
import database from '../config/db';
import moment from 'moment';

class ConsultantsController {

    getConsultants(req, res, next) {

        database.sequelize.query("SELECT cao_usuario.co_usuario, cao_usuario.no_usuario  FROM permissao_sistema INNER JOIN cao_usuario ON permissao_sistema.co_usuario=cao_usuario.co_usuario WHERE permissao_sistema.co_sistema = 1 AND permissao_sistema.in_ativo = 'S' AND (permissao_sistema.co_tipo_usuario = 0 OR permissao_sistema.co_tipo_usuario = 1 OR permissao_sistema.co_tipo_usuario = 2)").spread((results, metadata) => {
            res.status(200).json(results);
        })
    }

    async getConsultantReport(req, res, next) {

        if ( req.query.fromDate || req.query.toDate || req.query.users ) {

            const fromDate = moment(req.query.from, 'DD-MM-YYYY');
            const toDate = moment(req.query.to, 'DD-MM-YYYY');

            const users = typeof(req.query.users) === 'string' ? [req.query.users] : req.query.users;

            const result = await Consultant
            .findAll({ where: {
                co_usuario: {
                    $or : users
                }
            }, include : [{
                model: Salary
            },{
                model: ServiceOrder,
                include : [{
                    model: Bill,
                    where: {
                        data_emissao: { $gte: fromDate.format('YYYY-MM-DD'), $lte: toDate.format('YYYY-MM-DD')}
                    }
                }]
            }]});

            let reportData = [];

            result.forEach( ( consultant ) => {

                let user = {
                    name: consultant.no_usuario,
                    id: consultant.co_usuario,
                    salary: consultant.cao_salarios.length > 0 ? consultant.cao_salarios[0].brut_salario : 0,
                    months: [],
                    totalIncome:0,
                    totalcommission: 0
                };

                if (consultant.cao_os.length > 0) {

                    let previusMonth = moment(consultant.cao_os[0].cao_faturas[0].data_emissao, "YYYY-MM-DD");

                    let month = {
                        month: previusMonth.format('MM-YYYY'),
                        income: 0,
                        commission: 0
                    };

                    let cont = 0;

                    consultant.cao_os[0].cao_faturas.forEach((bill) => {

                        const billDate = moment(bill.data_emissao, "YYYY-MM-DD");

                        if (previusMonth.isSame(billDate, 'month')) {
                            month.income = month.income + (bill.valor - ((bill.valor * bill.total_imp_inc)/100));
                            month.commission = month.commission + ((bill.valor - (bill.valor * bill.total_imp_inc)/100) * (bill.valor * bill.comissao_cn)/100);

                            if (cont === consultant.cao_os[0].cao_faturas.length-1) {

                                user.months.push(month);
                                user.totalIncome = user.totalIncome + month.income;
                                user.totalcommission = user.totalcommission + month.commission;

                                month = {
                                    month: billDate.format('MM-YYYY'),
                                    income: 0,
                                    commission: 0
                                };
                            }

                        } else {

                            user.months.push(month);
                            user.totalIncome = user.totalIncome + month.income;
                            user.totalcommission = user.totalcommission + month.commission;

                            previusMonth = billDate;

                            //clean month obj
                            month = {
                                month: billDate.format('MM-YYYY'),
                                income: 0,
                                commission: 0
                            };

                            month.income = month.income  + (bill.valor - ((bill.valor * bill.total_imp_inc)/100));
                            month.commission = month.commission + ((bill.valor - (bill.valor * bill.total_imp_inc)/100) * (bill.valor * bill.comissao_cn)/100);

                        }
                        cont++;
                    });
                }

                reportData.push(user);
            });

            res.status(200).json(reportData);

        }else{
            res.status(400).json('Some fields on the request are invalid');
        }
    }
}

const consultantsController = new ConsultantsController();

export default consultantsController;
