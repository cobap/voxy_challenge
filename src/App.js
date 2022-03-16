import React, { useState } from 'react';

// Imports Material UI
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import './App.css';

const App = () => {

  // Para controlarmos a caixa de texto
  const [texto, setTexto] = useState('');
  const [quantidadePalavras, setQuantidadePalavras] = useState(0);
  const [textoAjuda, setTextoAjuda] = useState(null);

  // Nosso método vai contar quantas palavras existem na caixa de texto
  const conta_palavras = () => {

    // Validamos se de fato alguem digitou algum texto
    if (texto.replace(/\s+/g, '').trim() === '') {
    
      console.log('Não digitou nada');
      setQuantidadePalavras(-1);
      setTextoAjuda('Você precisa digitar uma palavra. E espaços não contam!')
    }
    else {

      // Método inspirado no link: https://www.invertexto.com/contador-caracteres

      // Normalizamos NFD para remover acentos (é, â, etc)
      // Removemos quebra de linhas e trocamos por espaço (a ordem é importante aqui, se fizermos isso depois, juntamos palavras)
      // Usando regex, removemos tudo que não são letras
      // Depois usamos outros regex para identificar espaços duplos dentro da string, trocando por 1 espaço só
      // Fazemos o trim para remover espaço extra no início e fim da string
      let texto_formatado = texto.normalize('NFD').replace(/(\r\n|\n|\r)/g, " ").replace(/[^a-zA-Z ]/g, "").replace(/\s+/g, ' ').trim()
      let contagem_palavras = texto_formatado.split(' ').length;

      setTextoAjuda(null)
      setQuantidadePalavras(contagem_palavras);

    }


  }

  return (      
      <Box className='main'>
        <Typography variant="h1" component="div" gutterBottom> Contador de palavras 🔮 </Typography>
        <Typography variant='p'> Perfeito para você twittar aquela mensagem sem passar o número de caract...</Typography>
        
        <TextField id='caixa_texto' label='Digite seu texto aqui' multiline rows={10} sx={{ marginTop: 2, marginBottom: 2, width: 600 }}
          onChange={(evento) => setTexto(evento.target.value)}
        error={quantidadePalavras === -1} helperText={textoAjuda}
        />
        
        <Button variant="contained" size="large" color="secondary" onClick={conta_palavras}> Contar Palavras </Button>

        {/* Aqui aproveitamos da condicional para mostrar o resultado só caso tenhamos uma quantidade de palavras correta */}
        { quantidadePalavras > 0 && 
        <Typography sx={{marginTop: 5, marginBottom: 10}} variant='p'> Contamos {quantidadePalavras} palavras na sua frase. Agora é melhor rever sua sintaxe! 😁 </Typography>
        }
  
      </Box>
  );
}


export default App;
