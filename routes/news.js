import express from 'express';
import { DB } from '../models/Database.js'; 
import multer from 'multer';
import 'dotenv/config';

const router = express.Router();

const storage = multer.memoryStorage()
const upload = multer({ storage })

router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { originalname, buffer } = req.file;

    let completeNews = {
      ...req.body,
      bannerFileName: `${Date.now()}-${originalname}`,
      bannerFile: buffer
    }


    await DB.createNews(completeNews);

    res.status(201).json({ message: `Funcionário registrado com sucesso!` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao carregar a imagem ou criar o registro de funcionário' });
  }
});

router.get('/bannerFile/:bannerFileName', async (req, res) => {
  try {
    const bannerFileName = req.params.bannerFileName
  
    const photo = await DB.getbannerFile(bannerFileName)
  
    res.setHeader('Content-Type', 'image/jpeg')

    res.end(photo);
  } catch (error) {
    res.status().send({message: 'Erro ao exibir a imagem', error});
  }
})

router.get('/', async (req, res) => {
  const news = await DB.listNews();

  res.status(200).json(news);
});

router.get('/:id', async (req, res) => {
  const employee = await DB.getbannerFile(req.params.id);

  res.status(200).json(employee)
})

router.put('/:id', async (req, res) => {
  const newsId = req.params.id;
  const newData = req.body;

  await DB.updateEmployee(newsId, newData);

  res.status(204).json({ message: 'Funcionário atualizado com sucesso' });
});


export default router;
