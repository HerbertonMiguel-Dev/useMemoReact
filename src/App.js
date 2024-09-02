import React, { useState, useEffect } from 'react'; // Importa React e os hooks useState e useEffect

function App() {
  // Hook useState para gerenciar o estado das tarefas e do input
  const [tarefas, setTarefas] = useState([]); // Inicializa tarefas como um array vazio
  const [input, setInput] = useState(''); // Inicializa input como uma string vazia

  // useEffect executado uma vez quando o componente é montado
  useEffect(() => {
    const tarefasStorage = localStorage.getItem('tarefas'); // Tenta obter tarefas do localStorage

    if (tarefasStorage) {
      setTarefas(JSON.parse(tarefasStorage)); // Se existirem tarefas no localStorage, atualiza o estado com essas tarefas
    }
  }, []); // Array de dependências vazio indica que o efeito deve rodar apenas na montagem

  // useEffect executado sempre que o estado 'tarefas' é atualizado
  useEffect(() => {
    localStorage.setItem('tarefas', JSON.stringify(tarefas)); // Salva a lista de tarefas no localStorage toda vez que a lista mudar
  }, [tarefas]); // Executa o efeito sempre que 'tarefas' mudar

  // Função para adicionar uma nova tarefa à lista
  function handleAdd() {
    setTarefas([...tarefas, input]); // Adiciona a nova tarefa (valor do input) à lista de tarefas
    setInput(''); // Limpa o campo de input após adicionar a tarefa
  }

  return (
    <div> {/* Container principal */}
      <ul> {/* Lista de tarefas */}
        {tarefas.map(tarefa => ( // Mapeia cada tarefa para um item de lista
          <li key={tarefa}>{tarefa}</li> // Cada tarefa é exibida como um item de lista (li)
        ))}
      </ul>

      {/* Campo de input controlado para adicionar novas tarefas */}
      <input 
        type="text" 
        value={input} // O valor do input é controlado pelo estado 'input'
        onChange={e => setInput(e.target.value)} // Atualiza o estado 'input' conforme o usuário digita
      />

      {/* Botão para adicionar a nova tarefa */}
      <button type="button" onClick={handleAdd}>Adicionar</button>
    </div>
  );
}

export default App; // Exporta o componente App como padrão para uso em outros arquivos
