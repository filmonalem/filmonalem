export default {
  // Global styles apply to _all_ inputs with matching section keys
  global: {
    fieldset: "max-w-md border border-gray-400 rounded px-2 pb-1",
    help: "text-xs text-gray-500",
    inner: "formkit-disabled:bg-gray-200  formkit-disabled:cursor-not-allowed formkit-disabled:pointer-events-none",
    input: "appearance-none h-8  px-2 py-1 border border-slate-300 w-full bg-slate-50 rounded   focus:outline-none focus:ring-0 focus:shadow-none",
    button: "h-8 px-3 py-1 text-white rounded-md focus:outline-none ",
    label: "block mb-1 text-gray-600 font-semibold text-sm",
    legend: "font-bold text-sm",
    loaderIcon: "inline-flex items-center w-4 text-gray-600 animate-spin",
    message: "text-red-500 mb-1 text-sm",
    messages: "list-none p-0 mt-1 mb-0",
    outer: "mb-4 formkit-disabled:opacity-50",
    prefixIcon: "w-10 flex self-stretch grow-0 shrink-0 rounded-tl rounded-bl border-r border-gray-400 bg-white bg-gradient-to-b from-transparent to-gray-200 [&>svg]:w-full [&>svg]:max-w-[1em] [&>svg]:max-h-[1em] [&>svg]:m-auto",
    suffixIcon: "w-7 pr-3 p-3 flex self-stretch grow-0 shrink-0 [&>svg]:w-full [&>svg]:max-w-[1em] [&>svg]:max-h-[1em] [&>svg]:m-auto",
  },
  select: {
    inner:
      "flex relative max-w-md items-center rounded mb-1 ring-1 ring-gray-400 focus-within:ring-2 [&>span:first-child]:focus-within:text-blue-500",
    input:
      'w-full pl-3 pr-8 py-2 border-none text-base text-gray-700 placeholder-gray-400 formkit-multiple:p-0 data-[placeholder="true"]:text-gray-400 formkit-multiple:data-[placeholder="true"]:text-inherit',
    selectIcon:
      "flex p-[3px] shrink-0 w-5 mr-2 -ml-[1.5em] h-full pointer-events-none [&>svg]:w-[1em]",
    option: "formkit-multiple:p-3 formkit-multiple:text-sm text-gray-700",
  },
};
