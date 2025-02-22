import { createContext, useContext, useState, ReactNode } from "react"

type QrScreenContextType = {
  isQrScreenVisible: boolean
  setQrScreenVisible: (visible: boolean) => void
}

const QrScreenContext = createContext<QrScreenContextType>({
  isQrScreenVisible: false,
  setQrScreenVisible: () => {},
})

export const QrScreenProvider = ({ children }: { children: ReactNode }) => {
  const [isQrScreenVisible, setQrScreenVisible] = useState(false)

  return (
    <QrScreenContext.Provider value={{ isQrScreenVisible, setQrScreenVisible }}>
      {children}
    </QrScreenContext.Provider>
  )
}

export const useQrScreen = () => {
  const context = useContext(QrScreenContext)
  if (context === undefined) {
    throw new Error("useQrScreen must be used within a QrScreenProvider")
  }
  return context
}
