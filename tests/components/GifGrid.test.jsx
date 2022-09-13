import { findAllByTestId, render, screen } from "@testing-library/react";
import { GifGrid } from "../../src/components";
import { useFetchGifs } from "../../src/hooks/useFetchGifs";

jest.mock("../../src/hooks/useFetchGifs");

describe("Pruebas en <GifGrid />", () => {
  const category = "One Punch";
  test("Debe de mostrar el loading inicialmente ", () => {
    useFetchGifs.mockReturnValue({
      images: [],
      isLoading: true,
    });

    render(<GifGrid category={category} />);
    expect(screen.getByText("Cargando...."));
    expect(screen.getByText(category));
  });
  test("Debe mostrar items cuando se cargan las imagenes", () => {
    const gifs = [
      {
        id: "ABC",
        title: "SAITAMA",
        url: "http://localhost/saitama.jpg",
      },
      {
        id: "ABC1",
        title: "goku",
        url: "http://localhost/goku.jpg",
      },
    ];
    useFetchGifs.mockReturnValue({
      images: gifs,
      isLoading: findAllByTestId,
    });

    render(<GifGrid category={category} />);
    expect(screen.getAllByRole("img").length).toBe(2);
  });
});
