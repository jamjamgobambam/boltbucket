import React from 'react'
import '../App.css'
import OptionsCard from '../components/OptionsCard'

const Options = ({exterior, roof, wheels, interior}) => {

  return (
    <div className="Options">
      <details>
        <summary>Exterior</summary>
        <div className="options-list">
          {
            exterior && exterior.length > 0 ?
            exterior.map((exterior, index) =>
              <OptionsCard key={exterior.id}
                id={exterior.id}
                color={exterior.color}
                image={exterior.image}
              />
            ) : <p>{'No exterior options'}</p>
          }
        </div>
      </details>

      <details>
        <summary>Roof</summary>
        <div className="options-list">
          {
            roof && roof.length > 0 ?
            roof.map((roof, index) =>
              <OptionsCard key={roof.id}
                id={roof.id}
                color={roof.color}
                image={roof.image}
              />
            ) : <p>{'No roof options'}</p>
          }
        </div>
      </details>

      <details>
        <summary>Wheels</summary>
        <div className="options-list">
          {
            wheels && wheels.length > 0 ?
            wheels.map((wheels, index) =>
              <OptionsCard key={wheels.id}
                id={wheels.id}
                color={wheels.color}
                image={wheels.image}
              />
            ) : <p>{'No wheels options'}</p>
          }
        </div>
      </details>

      <details>
        <summary>Interior</summary>
        <div className="options-list">
          {
            interior && interior.length > 0 ?
            interior.map((interior, index) =>
              <OptionsCard key={interior.id}
                id={interior.id}
                color={interior.color}
                image={interior.image}
              />
            ) : <p>{'No interior options'}</p>
          }
        </div>
      </details>
    </div>
  )
}

export default Options