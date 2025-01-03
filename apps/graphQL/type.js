export const typeDefs = `

  type Student {
    id: String,
    name: String,
    sex: Boolean,
    age: Int
  }

  type Teacher {
    id: String,
    name: String,
    age: Int,
    students: [Student],
    subjects: [String]
  }

  type Query {
    students: [Student]
    teachers: [Teacher],
    studentsByTeacherName(name: String!): [Student]
  }

  schema {
    query: Query
  }
`;

const students = [
  {
    id: "1",
    name: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return "ice";
    },
    sex: true,
    age: 18,
  },
  {
    id: "2",
    name: "东东",
    sex: true,
    age: 13,
  },
  {
    id: "3",
    name: "小红",
    sex: false,
    age: 11,
  },
];

const teachers = [
  {
    id: "1",
    name: "胡老师",
    sex: true,
    subjects: ["编程", "前端"],
    age: 30,
    students,
  },
];

export const resolvers = {
  Query: {
    students: () => students,
    teachers: () => teachers,
    // 查询某个老师的学生信息
    studentsByTeacherName: async (...args) => {
      console.log("args ->", args);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      return students;
    },
  },
};
