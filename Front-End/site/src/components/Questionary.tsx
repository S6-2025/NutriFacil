import "./../css/Questionary.css";

 function Questionary() {
  return (
    <div className="questionary-container">
      {/* Etapa: imagem */}
      <div className="step-image">
        <img src="/images/welcome.png" alt="Welcome" />
        <h2>Welcome!</h2>
        <button>Continue</button>
      </div>

      {/* Etapa: descrição + pergunta */}
      <div className="step-description">
        <p className="description-text">Choose your favorite fruit</p>
        <h3>Fruits</h3>
        <ul>
          <li><button>Apple</button></li>
          <li><button>Banana</button></li>
          <li><button>Orange</button></li>
        </ul>
      </div>

      {/* Etapa: escolha única */}
      <div className="step-single">
        <h3>Pick one drink</h3>
        <ul>
          <li><button>Water</button></li>
          <li><button>Juice</button></li>
          <li><button>Soda</button></li>
        </ul>
      </div>

      {/* Etapa: múltiplas escolhas */}
      <div className="step-multiple">
        <h3>Select your preferred meals</h3>
        <ul>
          <li><button>Rice</button></li>
          <li><button>Pasta</button></li>
          <li><button>Salad</button></li>
        </ul>
      </div>
    </div>
  );
}

export default Questionary;