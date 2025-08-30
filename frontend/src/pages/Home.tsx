import { ThemeProvider } from "../components/ui/theme-provider";

function Home() {
  return (
    <ThemeProvider defaultTheme="dark">
      <p>Hello World!</p>
    </ThemeProvider>
  );
}

export default Home;
