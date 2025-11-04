const Card = (props: any) => {
  const { pokemon } = props;

  return (
    <>
      {pokemon?.map((p: any) => {
        return (
          <div
            key={p?.id}
            className="flex flex-col items-center justify-center gap-2 rounded-xl bg-red-200 p-2 shadow-lg cursor-pointer hover:bg-violet-300"
          >
            <img className="" src={p?.sprites?.front_default} alt="" />
            <span className="text-lg font-bold text-gray-900 text-center">
              {p?.name.toUpperCase()}
            </span>
            <span className="text-base text-gray-500">{`#${p?.id.toString().padStart(4, "0")}`}</span>
            <div>
              {p?.types?.map((t: any) => {
                return (
                  <span
                    className="p-1 font-bold"
                    style={{ color: `var(--${t.type.name})` }}
                    key={t.type.name}
                  >
                    {t.type.name.toUpperCase()}
                  </span>
                );
              })}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Card;
