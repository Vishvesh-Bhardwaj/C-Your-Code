export const getOutput = (output) => {

    return (
      <>
      {output && <span className="text-[#5cb85c] font-mono text-sm px-2">Finised in {parseInt(output.time*100)} ms </span> }
      <pre className="px-2 py-2 font-mono text-sm ">
        {output !== null
          ? `${output}`
          : null}
      </pre>
      </>
    );
  
};

export const statusColor = {
  Running : '#0088cc',
  
};
