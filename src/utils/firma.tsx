import { FirmaSDK } from '@firmachain/firma-js';
import { FIRMA_CONFIG } from '../config';

const firmaSDK = new FirmaSDK(FIRMA_CONFIG);

export const getGenerateIpfsUri = async (buffer: any) => {
  const ipfsImageHash = await firmaSDK.Ipfs.addBuffer(buffer);
  const uri = firmaSDK.Ipfs.getURLFromHash(ipfsImageHash);

  return uri;
};
