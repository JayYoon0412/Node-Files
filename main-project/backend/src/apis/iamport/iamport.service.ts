import {
  Injectable,
  InternalServerErrorException,
  UnprocessableEntityException,
} from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class IamportService {
  async getToken() {
    const rsp = await axios({
      url: 'https://api.iamport.kr/users/getToken',
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      data: {
        imp_key: '2832529714891659',
        imp_secret:
          '1f4e729ba8c6494e2e994f0640ff41d3fa5bbac50977ab8c0085d45b56f33ec5e72a3a15a193ea35',
      },
    });
    return rsp.data.response.access_token;
  }

  async getPaymentData({ access_token, impUid }) {
    try {
      const rsp = await axios({
        url: `https://api.iamport.kr/payments/${impUid}`,
        method: 'get',
        headers: { Authorization: access_token },
      });
      return rsp.data.response;
    } catch (error) {
      throw new UnprocessableEntityException(
        'ERROR 422: 처리되지 않은 결제입니다. 다시 시도해주세요.',
      );
    }
  }

  async requestCancel({
    access_token,
    impUid: imp_uid,
    payPrice: cancel_request_amount,
  }) {
    try {
      const rsp = await axios({
        url: 'https://api.iamport.kr/payments/cancel',
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: access_token, // 아임포트 서버로부터 발급받은 엑세스 토큰
        },
        data: {
          imp_uid,
          amount: cancel_request_amount, // 가맹점 클라이언트로부터 받은 환불금액
        },
      });
      return rsp.data;
    } catch (error) {
      throw new InternalServerErrorException(
        'ERROR 500: 처리 과정에서 알 수 없는 문제가 발생했습니다.',
      );
    }
  }
}
