const graphStyle = (isDark: boolean) => [
  {
    selector: 'node[label]',
    css: {
      label: 'data(label)',
      color: isDark ? 'white' : 'black',
    },
  },
  {
    selector: 'edge[label]',
    css: {
      label: 'data(label)',
      width: 3,
      color: isDark ? 'white' : 'black',
    },
  },
  {
    selector: '.timeLow',
    css: {
      color: 'red',
    },
  },
];

export default graphStyle;
