import NodeRSA  from 'node-rsa';
const baseUrl = "https://api.bitget.com";



export const sign = (p: any) => {

    const private_key = '-----BEGIN PRIVATE KEY-----\n' +
    'MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCzwUgADBSNmSku\n' +
    'Sjzzo5rl9FQzlkRjO/VkExkKRatRCc5YU8Lgek32UVhrWu508H3PAQOx7E1zxxhk\n' +
    'L59Bidq8cQgkbbbef8CbiRepNYimiC57Hy9yyq1uUfYVI10izlu5L1tMo2z3wRrk\n' +
    'cQok2k5mMY23kpwmJ1QZguU4sX21yvtuIa7VBWRPCdNHqTXAcr8RdSP7XMHftlvZ\n' +
    'VStPJsbW5EMwt4rX6i3jWjfTLivJU1W1d39vCvlBQ4DHoq0nuntm9VQBvn2OkWwI\n' +
    'Bj1e0C362v/GRWFOyXo215XsoOjl0LwnWuTPMOM+NHHv5ebeMEhqnbuHa3KcUj17\n' +
    'P0zEsq1XAgMBAAECggEAAfgmH8oCF6ML7nPlww2Rzt8kZQRKb4PiplwHNDObMuIW\n' +
    'nqUcR3VPkVlGzLZMUn+oATKTpcle99vAiqhy6DbobJQYcL26+SkRJSMVXUc23gwz\n' +
    '5ilrTaimycSgG48toAn+u0Knj2li8jvtXX9XixvRLBFy6gXzK//WTgk/FaXsKKex\n' +
    '8O4H5l7VAAF2V/Ddarx2he3vC9thQC+wJrPhQvldD8H6Bw16GPQ8E5c0J9MnOm3u\n' +
    'qMPUvJLOQRJyaCBAWS//nl1DACzvfLFDcRCTa8VqCRFw51EhYAjub8HEepYyTXoI\n' +
    'dPp5qVBY+Zt1WJ2WZxeGHM90axSq/g6vgAcdFTloMQKBgQDgiqcm7M9Cax0IZClJ\n' +
    'ltOpUmOGEOpncxvmBCYLaADTDykP4WPa4XeEBC+tE/ZUIz5Syw5RZ6JXPbYzipvb\n' +
    'lIgHZYomg9Y2NgvIKepovdrdJ9B6s/JwwXiJaewwNF693/9ZyfEl1xmgYjziwlYs\n' +
    'jegCRzKqOU9aK6Ej+qwZl2jxRQKBgQDM8FMD14ykFmPBHkFmPlgKMm1CAGaMfs8b\n' +
    '2AZ9ugAlS/8FThPP5e2pOI8traMkz72gQqjSm+Ug/OJYcY+QK6zRSo2h7SwkiXUw\n' +
    '8VsfYTH/XCQzgkRuWpPNnRHR+8LrrI/Nrl+I2Wy6rL+ZIog72qX5AVgW0aT7qG2D\n' +
    'f6ShlfAX6wKBgE1aVqUJNYlK/zBx2OtaA0a0dEauMyI6PGUsDrMlPAt5kIrA+bZg\n' +
    'r9yR2J7GXrizf3fkLeWLTxjA0LDG0lR9wbLSnxoPls8MJVjqX69/oBNJ8P8kWKPR\n' +
    'cqXcEJq2n+DHdt9Gu0Vu6Ywf65uumSM2K7QFNQYBQj3tA9EyPPGAAI4FAoGAHbNu\n' +
    'tI3Wqik8h850t/atF707LGeWdSIjrete9XWxc7ZR3Vj1chnmmbHCvmH91OXum31N\n' +
    'rkg9qsw7mYnLvp81ypc9c4xF632oaFFyXVfewR1/eZ+Vf1DNPu1WmdIc6770kGCH\n' +
    'I/Qu19cVZYIlsFb92tqhA52ahYZhaL9lAq4SP8UCgYAIpIt3AXZkEFB5rqkyhB8x\n' +
    'BT4AHjPJ9GskMkYgtuloIsUwUFM7uqQxjr+g6XKB5NFZq4Snpb+WLuJ7/s9YpAst\n' +
    'ARkzPXBGVNF7kq6CIkplxGTn9TaoEwZZlwSlPkDXyyrbXYtK8xp3pbQkzlCH0kbc\n' +
    'R/lA0O9ST4cv1I+9CC5GgQ==\n' +
    '-----END PRIVATE KEY-----\n';

    const NodeRSA = require('node-rsa')
    const pri_key = new NodeRSA(private_key)

    const params = `orderId=${p.orderId}&startTime=${p.ts}`
    const pre_hash = String(p.ts) + p.url + '?' + params
    const sign = pri_key.sign(pre_hash, 'base64', 'UTF-8')
    
    return sign
}