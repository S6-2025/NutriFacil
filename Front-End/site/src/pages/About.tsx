import React from 'react'

const About: React.FC = () => {
  return (
    <main className="super-container" >
      <section className="text-button-block">
        <h1>Sobre nós</h1>
        <span>🍎 Lorem, ipsum dolor sit amet </span> 
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore aliquid ab, et saepe id repellendus quae? Nam quidem ipsam tenetur esse exercitationem? Quo quisquam aperiam at consectetur voluptatum veritatis quod.
        </p>
        {/* <div className="button-wrapper">
          <button type="button">Voltar para a home</button>
        </div> */}
      </section>


      <section className="image-block">
        <img src="/hamburguer.png" alt="Frutas"  />

      </section>

{/*  waves aqui */}
      {/* <section className="section-divider">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" aria-hidden="true" focusable="false">
          <path
            fill="#DBFFD0"
            fillOpacity="1"
            d="M0,256L48,240C96,224,192,192,288,192C384,192,480,224,576,224C672,224,768,192,864,176C960,160,1056,160,1152,160C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </section> */}

      {/*  waves acaba aqui */}

    </main>
  )
}

export default About
