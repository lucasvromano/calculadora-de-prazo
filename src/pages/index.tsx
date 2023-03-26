import { NextPage } from "next";
import { useCallback, useEffect, useState } from "react";

interface FormData {
  pessimistic: number;
  probable: number;
  optimistic: number;
  hasTests: boolean;
}

const formEmpty = {
  pessimistic: 0,
  probable: 0,
  optimistic: 0,
  hasTests: false,
};

const Home: NextPage = () => {
  const [formData, setFormData] = useState<FormData>(formEmpty);
  const [storyPoints, setStoryPoints] = useState<number>(0);


  const handleChange = (event: any) => {
    const { name, value } = event.target;
    const hasTest = name === 'hasTests';
    calculateDeadLine();

    if (hasTest) {
      return setFormData({ ...formData, [name]: !formData.hasTests });
    }
    return setFormData({ ...formData, [name]: parseInt(value) });
  };

  const calculateDeadLine = useCallback(() => {
    const calcule: number = (formData.pessimistic + 4 * formData.probable + formData.optimistic) / 6;
    const calculeWithTests: number = calcule + (calcule * (30 / 100));
    formData.hasTests ? setStoryPoints(calculeWithTests) : setStoryPoints(calcule);
  }, [formData])


  const convertInHours = () => {
    const hours = Math.floor(storyPoints);
    const minutes = Math.round((storyPoints % 1) * 60);
    return `${hours <= 9 ? `0${hours}` : hours}:${minutes <= 9 ? `0${minutes}` : minutes} horas`;
  }

  useEffect(() => {
    calculateDeadLine();
  }, [calculateDeadLine]);

  return (
    <>
      <main className="bg-gray-200 ">
        <section className="container mx-auto h-screen w-3/4">
          <div className="flex flex-col justify-center h-full">
            <h1 className="text-4xl font-bold text-center">
              Cálculo de prazos
            </h1>
            <p className="text-center my-4">
              Cálculo baseado na estivativa de três pontos, ou técnica PERT
            </p>

            <p className="text-center text-sm font-light">
              Considere os story points em horas*
            </p>

            <form className="my-6">
              <div className="mb-3">
                <label className="block" htmlFor="pessimistic">
                  Prazo pessimista
                </label>
                <input
                  id="pessimistic"
                  name="pessimistic"
                  type="number"
                  min={0}
                  value={formData.pessimistic}
                  onChange={handleChange}
                  placeholder="Ex: 10"
                  className="border border-gray-400 rounded py-1 px-2 w-full"
                />
              </div>

              <div className="mb-3">
                <label className="block" htmlFor="probable">
                  Prazo mais provável
                </label>
                <input
                  id="probable"
                  name="probable"
                  value={formData.probable}
                  onChange={handleChange}
                  type="number"
                  min={0}
                  placeholder="Ex: 7"
                  className="border border-gray-400 rounded py-1 px-2 w-full"
                />
              </div>

              <div className="mb-3">
                <label className="block" htmlFor="optimistic">
                  Prazo otimista
                </label>
                <input
                  id="optimistic"
                  name="optimistic"
                  value={formData.optimistic}
                  onChange={handleChange}
                  type="number"
                  min={0}
                  placeholder="Ex: 5"
                  className="border border-gray-400 rounded py-1 px-2 w-full"
                />
              </div>

              <div className="flex">
                <div className="flex items-center h-5">
                  <input
                    id="hasTests"
                    name="hasTests"
                    checked={formData.hasTests}
                    onChange={handleChange}
                    aria-describedby="hasTests-text"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                </div>
                <div className="ml-2 text-sm">
                  <label htmlFor="hasTests" className="font-medium text-gray-900 dark:text-gray-300">
                    Considerar testes unitários
                  </label>
                  <p id="hasTests-text" className="text-xs font-normal text-gray-500 dark:text-gray-300">
                    Soma 30% ao valor estimado.
                  </p>
                </div>
              </div>

            </form>

            <p className="text-center">
              O prazo estimado desta atividade é de  {" "}
              <span className="font-bold text-xl">{`${storyPoints.toFixed(2)} story points`}</span>{" ou "}
              <span className="font-bold text-xl">{convertInHours()}.</span>{" "}
            </p>
          </div>
        </section>
      </main>
    </>
  );
};
export default Home;
