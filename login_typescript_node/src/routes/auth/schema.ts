import Joi from 'joi';
import { JoiEmail, JoiPassword, JoiName } from '../../helpers/validator';

export default {
  signup: Joi.object().keys({
    name: JoiName().required(),
    email: JoiEmail().required(),
    password: JoiPassword().required()
  }),
  
  login: Joi.object().keys({
    email: JoiEmail().required(),
    password: JoiPassword().required()
  }),
  
  changePassword: Joi.object().keys({
    currentPassword: JoiPassword().required(),
    newPassword: JoiPassword().required()
  }),
  
  forgotPassword: Joi.object().keys({
    email: JoiEmail().required()
  }),
  
  resetPassword: Joi.object().keys({
    token: Joi.string().required(),
    newPassword: JoiPassword().required()
  })
};
