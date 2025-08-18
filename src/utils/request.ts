import axios,{AxiosInstance,AxiosRequestConfig,AxiosResponse} from "axios";
import { sign } from "@/utils/sign";
// const baseURL: string = process.env.NEXT_PUBLIC_API || '';
const baseUrl = "https://api.bitget.com";

class HttpClient {
  private instance: AxiosInstance;

  // curl "https://api.bitget.com/api/v2/spot/trade/orderInfo?orderId=1234567890" \
  //  -H "ACCESS-KEY:*******" \
  //  -H "ACCESS-SIGN:*" \
  //  -H "ACCESS-PASSPHRASE:*" \
  //  -H "ACCESS-TIMESTAMP:1659076670000" \
  //  -H "locale:en-US" \
  //  -H "Content-Type: application/json"

  constructor(baseURL:string) {
    this.instance = axios.create({
      baseURL,
      timeout: 10000,
    })

    //请求拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // 在这里可以添加通用的请求头，例如 Authorization
        const ts = Date.now();
        const params = {
          ts,
          orderId: config.params?.orderId,
          url: config.url,
        }
        config.headers['ACCESS-KEY'] = 'bg_5ac9a9d021209922457078c26a3cb652';
        config.headers['ACCESS-SIGN'] = sign(params); // 调用sign函数获取签名
        config.headers['ACCESS-PASSPHRASE'] = '32458957Swz'; //
        config.headers['ACCESS-TIMESTAMP'] = String(ts); // 使用当前时间戳
        config.headers['locale'] = 'en-US'; // 设置语言环境
        config.headers['Content-Type'] = 'application/json'; // 设置内容类型
        
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // 响应拦截器
    this.instance.interceptors.response.use(
      (response) => {
        return response.data; // 直接返回响应数据
      },
      (error) => {
        // 处理错误
        console.error("HTTP Error:", error.response || error.message);
        return Promise.reject(error);
      }
    );
  }

  async get(url: string, params?: any): Promise<AxiosResponse> {
    return this.instance.get(url, params );
  }

  async post(url: string, data?: any): Promise<AxiosResponse> {
    return this.instance.post(url, data);
  }

}

export default new HttpClient(baseUrl);