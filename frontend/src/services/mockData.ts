/**
 * Mock data service
 * Provides fixed knowledge point data for development
 * Following FR-021: Returns same mock data for any uploaded image
 */

import type { KnowledgeAnalysisResponse, DialogueResponse } from '../types'

export const mockKnowledgeData: KnowledgeAnalysisResponse = {
  detailedExplanation: `这张图片展示了机器学习领域的核心概念，主要涉及线性代数和机器学习的基础知识。

图片中包含了矩阵运算、向量空间等线性代数的基本概念，这些是机器学习算法的重要数学基础。同时，图片还展示了监督学习和无监督学习的基本原理，这是机器学习的两大主要分支。

通过这张图片，我们可以理解：
1. 线性代数在机器学习中的重要作用
2. 矩阵运算如何应用于神经网络
3. 监督学习与无监督学习的区别和应用场景
4. 如何从数学基础过渡到实际应用

这些知识点构成了机器学习学习的完整路径，从数学基础到算法实现，再到实际应用。`,
  prerequisites: [
    {
      id: 'kp-p001',
      title: '高等数学',
      description: '微积分和数学分析基础',
    },
    {
      id: 'kp-p002',
      title: '概率论',
      description: '概率分布和统计推断',
    },
    {
      id: 'kp-p003',
      title: '统计学',
      description: '描述性统计和假设检验',
    },
    {
      id: 'kp-p004',
      title: 'Python编程',
      description: 'Python基础语法和常用库',
    },
    {
      id: 'kp-p005',
      title: '数据结构',
      description: '数组、链表、树等数据结构',
    },
  ],
  keyPoints: [
    {
      id: 'kp-001',
      title: '线性代数基础',
      description: '矩阵运算和向量空间的基本概念，是机器学习的重要数学基础',
      category: '数学',
      confidence: 0.95,
    },
    {
      id: 'kp-002',
      title: '机器学习入门',
      description: '监督学习和无监督学习的基本原理，是理解AI的核心',
      category: '计算机科学',
      confidence: 0.88,
    },
  ],
  funExamples: [
    {
      knowledgePointId: 'kp-001',
      title: '矩阵运算的趣味应用：图像滤镜',
      content: `想象一下，你拍了一张照片，想要添加一个"怀旧"滤镜。这其实就是矩阵运算！

每张图片都可以看作是一个巨大的矩阵，每个像素的颜色值（RGB）就是矩阵中的元素。当你应用滤镜时，实际上是在对矩阵进行运算：
- 模糊效果 = 矩阵卷积运算
- 亮度调整 = 矩阵加法运算
- 对比度调整 = 矩阵乘法运算

就像做数学题一样，只不过这次是在"美化"你的照片！`,
    },
    {
      knowledgePointId: 'kp-002',
      title: '监督学习：像教小孩认动物',
      content: `监督学习就像教小孩认识动物一样！

当你给小孩看很多猫的照片，并告诉他"这是猫"，然后看很多狗的照片，说"这是狗"，小孩就学会了区分猫和狗。这就是监督学习：
- 你提供的照片 = 训练数据
- "这是猫/狗" = 标签
- 小孩的大脑 = 机器学习模型
- 学会区分 = 模型训练完成

下次小孩看到新的猫或狗的照片，就能正确识别了，这就是模型的预测能力！`,
    },
  ],
  postrequisites: [
    {
      id: 'kp-n001',
      title: '深度学习',
      description: '神经网络和反向传播算法',
    },
    {
      id: 'kp-n002',
      title: '自然语言处理',
      description: '文本处理和语言模型',
    },
    {
      id: 'kp-n003',
      title: '计算机视觉',
      description: '图像识别和目标检测',
    },
    {
      id: 'kp-n004',
      title: '强化学习',
      description: 'Q学习和策略梯度方法',
    },
    {
      id: 'kp-n005',
      title: '模型优化',
      description: '超参数调优和模型压缩',
    },
  ],
  conclusion: `通过这张图片的学习，我们掌握了机器学习的核心基础：

1. **数学基础**：线性代数为机器学习提供了强大的数学工具，矩阵运算贯穿整个学习过程。

2. **核心概念**：理解了监督学习和无监督学习的区别，这是选择合适算法的基础。

3. **学习路径**：从数学基础到算法实现，再到实际应用，形成了完整的学习体系。

4. **实践应用**：这些知识点可以应用于图像处理、自然语言处理、推荐系统等多个领域。

继续深入学习后置知识点，将帮助你掌握更高级的机器学习技术，如深度学习、强化学习等，从而在实际项目中应用这些知识。`,
}

export const getMockDialogueResponse = (
  knowledgePointId: string,
  userMessage: string
): DialogueResponse => {
  // Mock AI responses based on knowledge point
  const responses: Record<string, string> = {
    'kp-001':
      '线性代数基础是机器学习的重要数学基础。它主要涉及矩阵运算、向量空间、特征值和特征向量等概念。矩阵运算包括矩阵的加法、乘法、转置等基本操作，这些操作在机器学习算法中广泛应用，例如在神经网络的前向传播和反向传播过程中。',
    'kp-002':
      '机器学习入门涵盖了监督学习和无监督学习的基本原理。监督学习使用标记数据训练模型，如分类和回归问题；无监督学习则从无标记数据中发现模式，如聚类和降维。理解这些基础概念对于深入学习更高级的机器学习技术至关重要。',
  }

  return {
    message:
      responses[knowledgePointId] ||
      `关于"${knowledgePointId}"的知识点：${userMessage}。这是一个重要的概念，值得深入学习。`,
    timestamp: new Date(),
  }
}

