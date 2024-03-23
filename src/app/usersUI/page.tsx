import Link from 'next/link'
import React from 'react'

export default function page() {
  return (
      <div>
         <div className="d-flex text-center flex-column gap-2 mt-5 m-auto w-25">
            <Link className="text-light btn btn-primary" href="/login">login</Link>
            <Link className="text-light btn btn-danger" href="/register">register</Link>
         </div>
    </div>
  )
}
