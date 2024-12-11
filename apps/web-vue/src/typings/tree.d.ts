interface TreeConfigOptions {
  // 子属性的名称，默认为'children'
  childProps: string
}

interface TreeNode {
  children?: TreeNode[] // 可选的 children 属性，子节点是一个数组
  // 其他属性可以根据需要添加
  [key: string]: any
}

export type { TreeConfigOptions, TreeNode }
