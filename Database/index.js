let books = [
    {
      ISBN: "12345Book",
      title: "Getting started with MERN",
      pubDate: "2021-07-07",
      language: "en",
      numPage: 250,
      author: [1, 2],
      publications: [1],
      category: ["tech", "programming", "education", "thriller"],
    },
    {
      ISBN: "12345Two",
      title: "Getting started with Python",
      pubDate: "2021-07-07",
      language: "en",
      numOfPage: 225,
      author: [1, 2],
      category: ["fiction", "tech", "web dev"],
      publications: [1],
    },
  ];
  
  const author = [
    {
      id: 1,
      name: "Pavan",
      books: ["12345Book"],
    },
    { id: 2, name: "Elon Musk", books: ["12345Two"] },
  ];
  
  const publication = [
    {
      id: 1,
      name: "writex",
      books: ["12345Book"],
    },
    {
      id: 2,
      name: "Yash Publicaions",
      books: ["12345Two"],
    },
  ];
  
  module.exports={books,author,publication};

  