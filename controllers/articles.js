const articlesRouter = require('express').Router();
const Article = require('../models/Article');

articlesRouter.get('/', async (request, response) => {
  const articles = await Article.find({});

  response.json(articles.map((article) => article.toJSON()));
});

articlesRouter.get('/:id', async (request, response) => {
  const article = await Article.findById(request.params.id);

  response.json(article.toJSON());
});

articlesRouter.post('/', async (request, response) => {
  const body = request.body;

  const newArticle = new Article({
    createdAt: Date.now(),
    title: body.title,
    url: body.url,
    read: false,
  });

  console.log(newArticle);

  try {
    const createdArticle = await newArticle.save();
    return response.json(createdArticle.toJSON());
  }
  catch (error) {
    response.status(500).send({ error: 'Unable to create new Article.'});
  }
});

articlesRouter.put('/:id', async (request, response) => {
  const body = request.body;

  const articleToUpdate = {
    title: body.title,
    url: body.url,
    read: body.read,
  };

  try {
    const updatedArticle = await Article.findByIdAndUpdate(request.params.id, articleToUpdate, { new: true });
    return response.json(updatedArticle.toJSON());
  }
  catch (error) {
    response.status(500).send(`Houve um erro: ${error}`);
  }
});

articlesRouter.delete('/:id', async (request, response) => {
  try {
    const articleToDelete = await Article.findById(request.params.id);

    if (articleToDelete) {
      await Article.findByIdAndRemove(request.params.id);

      response.status(204).end();
    } else {
      response.status(404).send({ error: 'The article had already been deleted from the server.'});
    }
    
  }
  catch (error) {
    console.log('Not able to remove article (express)', error);
  }
});

module.exports = articlesRouter;