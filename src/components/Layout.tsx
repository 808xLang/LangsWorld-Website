import Navbar from './navBar';
import Homepage from '../pages/videos'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar />
      <Homepage />
      <main>{children}</main>
    </div>
  );
}