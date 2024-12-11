import { Injectable } from '@nestjs/common';

@Injectable()
export class SharedService {
  /**
   * 构造树型结构数据
   */
  public handleTree(
    data: any[],
    id?: string,
    parentId?: string,
    children?: string,
  ) {
    const config = {
      id: id || 'id',
      parentId: parentId || 'parentId',
      childrenList: children || 'children',
    };

    const childrenListMap = {};
    const nodeIds = {};
    const tree = [];

    for (const d of data) {
      const parentId = d[config.parentId];
      if (childrenListMap[parentId] == null) {
        childrenListMap[parentId] = [];
      }
      nodeIds[d[config.id]] = d;
      childrenListMap[parentId].push(d);
    }

    for (const d of data) {
      const parentId = d[config.parentId];
      if (nodeIds[parentId] == null) {
        tree.push(d);
      }
    }

    for (const t of tree) {
      adaptToChildrenList(t);
    }

    function adaptToChildrenList(o) {
      // 确保如果该节点有子节点列表，则它是一个数组
      if (childrenListMap[o[config.id]] != null) {
        o[config.childrenList] = childrenListMap[o[config.id]] || [];
      }

      // 如果节点有子节点列表，递归处理每个子节点
      if (o[config.childrenList]) {
        for (const c of o[config.childrenList]) {
          adaptToChildrenList(c);
        }
      } else {
        // 确保没有子节点时，childrenList 为空数组
        o[config.childrenList] = [];
      }
    }
    return tree;
  }
}
