import swaggerJsdoc from "swagger-jsdoc";

const options = {
    definition: {
        openapi: "3.0.3",

        info: {
            title: "Project Management API",
            version: "1.0.0",
            description:
                "RESTful API for Personal Project Management System",

            contact: {
                name: "Project Management Team",
                email: "admin@example.com"
            },

            license: {
                name: "MIT"
            }
        },

        servers: [
            {
                url: "http://localhost:5000/api",
                description: "Development Server"
            }
        ],

        tags: [
            {
                name: "Authentication",
                description: "Authentication APIs"
            },
            {
                name: "Users",
                description: "User Management APIs"
            },
            {
                name: "Projects",
                description: "Project Management APIs"
            },
            {
                name: "Tasks",
                description: "Task Management APIs"
            },
            {
                name: "Comments",
                description: "Comment Management APIs"
            },
            {
                name: "Notifications",
                description: "Notification APIs"
            },
            {
                name: "Statistics",
                description: "Dashboard & Statistics APIs"
            },
            {
                name: "Calendar",
                description: "Calendar APIs"
            },
            {
                name: "Upload",
                description: "Upload File APIs"
            }
        ],

        components: {

            securitySchemes: {

                bearerAuth: {

                    type: "http",

                    scheme: "bearer",

                    bearerFormat: "JWT"

                }

            },

            schemas: {

                RegisterRequest: {

                    type: "object",

                    required: [
                        "fullName",
                        "email",
                        "password"
                    ],

                    properties: {

                        fullName: {
                            type: "string",
                            example: "Nguyen Van A"
                        },

                        email: {
                            type: "string",
                            format: "email",
                            example: "admin@gmail.com"
                        },

                        password: {
                            type: "string",
                            format: "password",
                            example: "123456"
                        },

                        phone: {
                            type: "string",
                            example: "0901234567"
                        }

                    }

                },

                LoginRequest: {

                    type: "object",

                    required: [
                        "email",
                        "password"
                    ],

                    properties: {

                        email: {
                            type: "string",
                            format: "email",
                            example: "admin@gmail.com"
                        },

                        password: {
                            type: "string",
                            format: "password",
                            example: "123456"
                        }

                    }

                },

                RefreshTokenRequest: {

                    type: "object",

                    required: [
                        "refreshToken"
                    ],

                    properties: {

                        refreshToken: {
                            type: "string",
                            example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                        }

                    }

                },

                User: {

                    type: "object",

                    properties: {

                        _id: {
                            type: "string",
                            example: "687000000000000000000001"
                        },

                        fullName: {
                            type: "string",
                            example: "Nguyen Van A"
                        },

                        email: {
                            type: "string",
                            format: "email",
                            example: "admin@gmail.com"
                        },

                        phone: {
                            type: "string",
                            example: "0901234567"
                        },

                        avatar: {
                            type: "string",
                            example: "/uploads/avatar/avatar.png"
                        },

                        role: {
                            type: "string",
                            example: "user"
                        },

                        createdAt: {
                            type: "string",
                            format: "date-time"
                        },

                        updatedAt: {
                            type: "string",
                            format: "date-time"
                        },
                        status: {

                            type: "string",

                            example: "Active"

                        },

                        isVerified: {

                            type: "boolean",

                            example: true

                        }

                    }

                },

                RefreshToken: {

                    type: "object",

                    properties: {

                        _id: {
                            type: "string",
                            example: "687000000000000000000020"
                        },

                        userId: {
                            type: "string",
                            example: "687000000000000000000001"
                        },

                        token: {
                            type: "string",
                            example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                        },

                        expiredAt: {
                            type: "string",
                            format: "date-time"
                        },

                        createdAt: {
                            type: "string",
                            format: "date-time"
                        }

                    }

                },

                Project: {

                    type: "object",

                    properties: {

                        _id: {
                            type: "string",
                            example: "687000000000000000000001"
                        },

                        name: {
                            type: "string",
                            example: "Project Management System"
                        },

                        description: {
                            type: "string",
                            example: "Software Engineering Project"
                        },

                        priority: {
                            type: "string",
                            enum: [
                                "Low",
                                "Medium",
                                "High"
                            ],
                            example: "High"
                        },

                        status: {
                            type: "string",
                            enum: [
                                "Planning",
                                "In Progress",
                                "Completed",
                                "Cancelled"
                            ],
                            example: "In Progress"
                        },

                        startDate: {
                            type: "string",
                            format: "date"
                        },

                        endDate: {
                            type: "string",
                            format: "date"
                        },

                        progress: {
                            type: "number",
                            example: 65
                        },

                        createdBy: {
                            type: "string"
                        },

                        owner: {

                        type: "string",

                        example: "687000000000000000000001"

                        },

                        color: {

                            type: "string",

                            example: "#2563EB"

                        },

                        isDeleted: {
                            type: "boolean",
                            example: false
                        },

                        createdAt: {
                            type: "string",
                            format: "date-time"
                        },

                        updatedAt: {
                            type: "string",
                            format: "date-time"
                        }

                    }

                },

                Task: {

                    type: "object",

                    properties: {

                        _id: {
                            type: "string",
                            example: "687000000000000000000101"
                        },

                        title: {
                            type: "string",
                            example: "Thiết kế Database"
                        },

                        description: {
                            type: "string",
                            example: "Thiết kế MongoDB Collections"
                        },

                        project: {
                            type: "string"
                        },

                        assignedTo: {
                            type: "string"
                        },

                        attachment: {

                            type: "string",

                            example: "/uploads/tasks/design.pdf"

                        },

                        reminder: {

                            type: "string",

                            format: "date-time"

                        },

                        completed: {

                            type: "boolean",

                            example: false

                        },
                        priority: {
                            type: "string",
                            enum: [
                                "Low",
                                "Medium",
                                "High"
                            ]
                        },

                        status: {
                            type: "string",
                            enum: [
                                "Todo",
                                "In Progress",
                                "Completed"
                            ]
                        },

                        startDate: {
                            type: "string",
                            format: "date"
                        },

                        dueDate: {
                            type: "string",
                            format: "date"
                        },

                        completedAt: {
                            type: "string",
                            format: "date-time"
                        },

                        isDeleted: {
                            type: "boolean",
                            example: false
                        },

                        createdAt: {
                            type: "string",
                            format: "date-time"
                        },

                        updatedAt: {
                            type: "string",
                            format: "date-time"
                        }

                    }

                },

                Comment: {

                    type: "object",

                    properties: {

                        _id: {
                            type: "string",
                            example: "687000000000000000000301"
                        },

                        task: {
                            type: "string"
                        },

                        user: {
                            type: "string"
                        },

                        content: {
                            type: "string",
                            example: "Hoàn thành chức năng đăng nhập."
                        },

                        createdAt: {
                            type: "string",
                            format: "date-time"
                        },

                        updatedAt: {
                            type: "string",
                            format: "date-time"
                        }

                    }

                },

                Notification: {

                    type: "object",

                    properties: {

                        _id: {
                            type: "string",
                            example: "687000000000000000000501"
                        },

                        user: {
                            type: "string",
                            example: "687000000000000000000001"
                        },

                        title: {
                            type: "string",
                            example: "Task sắp đến hạn"
                        },

                        message: {
                            type: "string",
                            example: "Task 'Thiết kế Database' sẽ đến hạn sau 1 ngày."
                        },

                        type: {
                            type: "string",
                            enum: [
                                "Info",
                                "Warning",
                                "Success",
                                "Error"
                            ],
                            example: "Warning"
                        },

                        isRead: {
                            type: "boolean",
                            example: false
                        },

                        createdAt: {
                            type: "string",
                            format: "date-time"
                        },

                        updatedAt: {
                            type: "string",
                            format: "date-time"
                        }

                    }

                },
                ActivityLog: {

                    type: "object",

                    properties: {

                        _id: {
                            type: "string",
                            example: "687000000000000000000700"
                        },

                        user: {
                            type: "string",
                            example: "687000000000000000000001"
                        },

                        action: {
                            type: "string",
                            example: "CREATE_TASK"
                        },

                        target: {
                            type: "string",
                            example: "Task"
                        },

                        targetId: {
                            type: "string",
                            example: "687000000000000000000101"
                        },

                        description: {
                            type: "string",
                            example: "Tạo nhiệm vụ mới"
                        },

                        ipAddress: {
                            type: "string",
                            example: "127.0.0.1"
                        },

                        createdAt: {
                            type: "string",
                            format: "date-time"
                        }

                    }

                },
                DashboardStatistics: {

                    type: "object",

                    properties: {

                        totalProjects: {
                            type: "integer",
                            example: 8
                        },

                        totalTasks: {
                            type: "integer",
                            example: 56
                        },

                        completedTasks: {
                            type: "integer",
                            example: 35
                        },

                        inProgressTasks: {
                            type: "integer",
                            example: 15
                        },

                        pendingTasks: {
                            type: "integer",
                            example: 6
                        },

                        overdueTasks: {
                            type: "integer",
                            example: 2
                        },

                        completionRate: {
                            type: "number",
                            example: 62.5
                        }

                    }

                },

                CalendarEvent: {

                    type: "object",

                    properties: {

                        id: {
                            type: "string",
                            example: "687000000000000000000111"
                        },

                        title: {
                            type: "string",
                            example: "Thiết kế Database"
                        },

                        start: {
                            type: "string",
                            format: "date-time"
                        },

                        end: {
                            type: "string",
                            format: "date-time"
                        },

                        allDay: {
                            type: "boolean",
                            example: false
                        },

                        color: {
                            type: "string",
                            example: "#2563EB"
                        }

                    }

                },
                
                CalendarResponse: {

                    type: "array",

                    items: {

                        $ref: "#/components/schemas/CalendarEvent"

                    }

                },

                UploadResponse: {

                type: "object",

                properties: {

                    success: {
                        type: "boolean",
                        example: true
                    },

                    message: {
                        type: "string",
                        example: "Upload thành công."
                    },

                    fileName: {
                        type: "string",
                        example: "avatar.png"
                    },

                    originalName: {
                        type: "string",
                        example: "avatar.png"
                    },

                    url: {
                        type: "string",
                        example: "/uploads/avatar/avatar.png"
                    }

                }

            },

                CreateProjectRequest: {

                    type: "object",

                    required: [
                        "name"
                    ],

                    properties: {

                        name: {
                            type: "string",
                            example: "Project Management System"
                        },

                        description: {
                            type: "string",
                            example: "Software Engineering Project"
                        },

                        priority: {
                            type: "string",
                            enum: [
                                "Low",
                                "Medium",
                                "High"
                            ],
                            example: "High"
                        },

                        startDate: {
                            type: "string",
                            format: "date"
                        },

                        endDate: {
                            type: "string",
                            format: "date"
                        }

                    }

                },

                UpdateProjectRequest: {

                    allOf: [

                        {

                            $ref: "#/components/schemas/CreateProjectRequest"

                        }

                    ]

                },

                CreateTaskRequest: {

                    type: "object",

                    required: [
                        "title",
                        "project"
                    ],

                    properties: {

                        title: {
                            type: "string",
                            example: "Thiết kế Database"
                        },

                        description: {
                            type: "string",
                            example: "Thiết kế MongoDB"
                        },

                        project: {
                            type: "string",
                            example: "687000000000000000000001"
                        },

                        assignedTo: {
                            type: "string",
                            example: "687000000000000000000002"
                        },

                        priority: {
                            type: "string",
                            enum: [
                                "Low",
                                "Medium",
                                "High"
                            ]
                        },

                        status: {
                            type: "string",
                            enum: [
                                "Todo",
                                "In Progress",
                                "Completed"
                            ]
                        },

                        startDate: {
                            type: "string",
                            format: "date"
                        },

                        dueDate: {
                            type: "string",
                            format: "date"
                        }

                    }

                },

                UpdateTaskRequest: {

                    allOf: [

                        {

                            $ref: "#/components/schemas/CreateTaskRequest"

                        }

                    ]

                },

                CreateCommentRequest: {

                    type: "object",

                    required: [
                        "task",
                        "content"
                    ],

                    properties: {

                        task: {
                            type: "string",
                            example: "687000000000000000000101"
                        },

                        content: {
                            type: "string",
                            example: "Đã hoàn thành chức năng."
                        }

                    }

                },

                SuccessResponse: {

                    type: "object",

                    properties: {

                        success: {
                            type: "boolean",
                            example: true
                        },

                        message: {
                            type: "string",
                            example: "Success"
                        },

                        data: {
                            type: "object"
                        }

                    }

                },

                ErrorResponse: {

                    type: "object",

                    properties: {

                        success: {
                            type: "boolean",
                            example: false
                        },

                        message: {
                            type: "string",
                            example: "Error"
                        }

                    }

                },

                ValidationError: {

                    type: "object",

                    properties: {

                        success: {
                            type: "boolean",
                            example: false
                        },

                        message: {
                            type: "string",
                            example: "Validation failed"
                        },

                        errors: {

                            type: "array",

                            items: {

                                type: "object",

                                properties: {

                                    field: {
                                        type: "string",
                                        example: "email"
                                    },

                                    message: {
                                        type: "string",
                                        example: "Email is required"
                                    }

                                }

                            }

                        }

                    }

                },

                ValidationResponse: {

                    type: "object",

                    properties: {

                        success: {

                            type: "boolean",

                            example: false

                        },

                        message: {

                            type: "string",

                            example: "Validation failed."

                        },

                        errors: {

                            type: "array",

                            items: {

                                type: "string"

                            }

                        }

                    }

                },

                Pagination: {

                    type: "object",

                    properties: {

                        page: {
                            type: "integer",
                            example: 1
                        },

                        limit: {
                            type: "integer",
                            example: 10
                        },

                        totalItems: {
                            type: "integer",
                            example: 125
                        },

                        totalPages: {
                            type: "integer",
                            example: 13
                        },

                        hasNextPage: {
                            type: "boolean",
                            example: true
                        },

                        hasPreviousPage: {
                            type: "boolean",
                            example: false
                        }

                    }

                },

                UnauthorizedResponse: {

                    type: "object",

                    properties: {

                        success: {

                            type: "boolean",

                            example: false

                        },

                        message: {

                            type: "string",

                            example: "Unauthorized"

                        }

                    }

                },

                NotFoundResponse: {

                    type: "object",

                    properties: {

                        success: {

                            type: "boolean",

                            example: false

                        },

                        message: {

                            type: "string",

                            example: "Data not found"

                        }

                    }

                },

            }

        },

        security: [
            {
                bearerAuth: []
            }
        ]

    },

    apis: [
        "./src/routes/**/*.js"
    ]

};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;