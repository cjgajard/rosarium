interface INodeExt {
  children: INodeExt[];
  level: number;
  parent?: INodeExt;
  text: string;
}
interface INode {
  children?: (INode | string)[];
  text: string;
}
