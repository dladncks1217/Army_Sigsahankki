module.exports = (sequelize,DataTypes)=>(
    sequelize.define('user',{
        phoneNumber:{ // 사용자 전화번호
            type:DataTypes.STRING(40),
            allowNull:false,
            unique:true,
        },
        username:{ // 사용자 실제 이름
            type:DataTypes.STRING(40),
            allowNull:false,
        },
        email:{ // 사용자 이메일 (ID 대용)
            type:DataTypes.STRING(40),
            allowNull:false,
            unique:true,
        },
        password:{ // 비밀번호
            type:DataTypes.STRING(100),
            allowNull:false,
        },
        Classification_address:{ // 분류 주소 ex) 화천
            type:DataTypes.STRING(20),
            allowNull:false,
        }
    })
);