import { Tokens } from '../../app/storage/index'

export let config = () => {
  let withOutAuthconfig, authConfig;
  authConfig = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${Tokens.getToken() ? Tokens.getToken() : Tokens.getVerifyToken()}`,
      "Access-Control-Allow-Origin": "*"
    }
  };
  withOutAuthconfig = {
    headers: {
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "*"
    }
  };
  return Tokens.getToken() || Tokens.getVerifyToken() ? authConfig : withOutAuthconfig
}
//  = { getHeader }