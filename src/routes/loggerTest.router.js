import {Router} from 'express'
import { getLogger } from '../config/logger.js';

const router = Router()
const logger = getLogger();

router.get('/debug', (req, res) => {
  logger.debug('Mensaje de debug');
  res.send('Mensaje de debug');
});

router.get('/info', (req, res) => {
  logger.info('Mensaje de info');
  res.send('Mensaje de info');
});

router.get('/warning', (req, res) => {
  logger.warning('Mensaje de warning');
  res.send('Mensaje de warning');
});

router.get('/error', (req, res) => {
  logger.error('Mensaje de error');
  res.send('Mensaje de error');
});

router.get('/http', (req, res)=>{
    logger.http('Mensaje de http');
    res.send('Mensaje de http')
})

router.get('/fatal', (req, res) => {
  logger.fatal('Mensaje de fatal');
  res.send('Mensaje de fatal');
});

export default router;
