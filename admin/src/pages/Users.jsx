import React from 'react'

const Users = () => {
  return (
   
    <div className="max-h-screen ">
    <div className="max-w-6xl mx-auto">
      <div className="overflow-x-auto max-h-screen overflow-y-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-purple-900 text-white/90">
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">E-mail</th>
              <th className="py-3 px-6 text-left">Purchase count</th>
              <th className="py-3 px-6 text-left">Spent Amount</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-b">
              <td className="py-3 px-6">John Doe</td>
              <td className="py-3 px-6">24/05/1995</td>
              <td className="py-3 px-6">Web Developer</td>
              <td className="py-3 px-6">$120,000</td>
            </tr>

          </tbody>
        </table>
      </div>
    </div>
  </div>

  )
}

export default Users