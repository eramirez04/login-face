import  { ReactNode} from "react"


interface Props {
  children: ReactNode;
}

export const NavBar = ({ children }: Props) => {

  return (
    <>
      <nav className="bg-gradient-to-r from-blue-500 to-blue-200-700  shadow-lg">
        <div className="container mx-auto flex justify-between items-center px-6 py-4">
          {/* Logo */}
          <div className="text-2xl font-bold tracking-wide">
            <span   className="hover:opacity-80">BrandLogo</span>
          </div>

          {/* Desktop Links */}
          {children}
        </div>
      </nav>
    </>
  );
};
