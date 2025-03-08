import React from 'react'
import Divider from './Divider'

export default function Section({id}: {id: string}) {
  return (
    <>
      <Divider title="" buttonText={``} />
      <section id={id}>

      </section>
    </>
  )
}
