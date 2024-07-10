import React from 'react'

const Biography = ({imageUrl}) => {
  return (
    <div className='container biography'>
      <div className="banner">
        <img src={imageUrl} alt="about" />
      </div>
      <div className="banner">
        <p>Biography</p>
        <h3>Who We Are</h3>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corporis animi, distinctio ipsa iste quibusdam quae blanditiis velit! Eum ad incidunt perspiciatis quod, ipsam atque similique laboriosam voluptates consectetur eveniet officiis, obcaecati cumque amet aut quia dignissimos molestias nostrum voluptate veniam? Quos optio, fugit minus recusandae aliquam illum. Necessitatibus, nemo deserunt!</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        <p>Lorem ipsum dolor sit amet.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi in molestiae dignissimos, dolor error maxime quos? Modi labore perferendis dolorum veniam dicta enim officiis optio a ut. Impedit magnam aut harum adipisci hic ratione ipsam.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, deserunt. Corporis, soluta.</p>
        <p>Lorem, ipsum dolor.</p>
      </div>
    </div>
  )
}

export default Biography