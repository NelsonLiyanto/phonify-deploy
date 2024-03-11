import ServerProtectedComponents from "./ServerProtected";

const WishlistLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ServerProtectedComponents>
      <main className="">{children}</main>
    </ServerProtectedComponents>
  );
};

export default WishlistLayout;
