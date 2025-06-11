
// // 'use client'

// // import { Geist, Geist_Mono } from 'next/font/google'
// // import './globals.css'
// // import Navbar from '@/components/Navbar'
// // import { Provider } from 'react-redux'
// // import { store } from '@/libs/store'

// // const geistSans = Geist({
// //   variable: '--font-geist-sans',
// //   subsets: ['latin'],
// // })

// // const geistMono = Geist_Mono({
// //   variable: '--font-geist-mono',
// //   subsets: ['latin'],
// // })

// // export const metadata = {
// //   title: 'Admin Dashboard',
// //   description: 'Voter management system',
// // }

// // export default function RootLayout({ children }) {
// //   return (
// //     <html lang="en">
// //       <body
// //         className={`${geistSans.variable} ${geistMono.variable} antialiased`}
// //       >
// //         <Provider store={store}>
// //           <Navbar />
// //           {children}
// //         </Provider>
// //       </body>
// //     </html>
// //   )
// // }


// 'use client'

// import { Geist, Geist_Mono } from 'next/font/google'
// import './globals.css'
// import Navbar from '@/components/Navbar'
// import { Provider } from 'react-redux'
// import { store } from '@/libs/store'

// const geistSans = Geist({
//   variable: '--font-geist-sans',
//   subsets: ['latin'],
// })

// const geistMono = Geist_Mono({
//   variable: '--font-geist-mono',
//   subsets: ['latin'],
// })

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
//         <Provider store={store}>
//           <Navbar />
//           {children}
//         </Provider>
//       </body>
//     </html>
//   )
// }



'use client'

import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import { Provider } from 'react-redux'
import { store } from '@/libs/store'
import { ToastContainer } from 'react-toastify' // ✅ Add this
import 'react-toastify/dist/ReactToastify.css'  // ✅ Add this

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}> */}
     <body className=''>
        <Provider store={store}>
          <Navbar />
          {children}
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </Provider>
      </body>
    </html>
  )
}
