module.exports = (sequelize,DataTypes)=>(
    sequelize.define('restaurant',{
        business_name:{ // 가게명
            type:DataTypes.STRING(30),
            allowNull:false,
            unique:true,
        },
        tel:{ // 전화번호
            type:DataTypes.STRING(40),
            allowNull:false,
            unique:true,
        },
        restaurant_type:{ // 한식 일식 중식
            type:DataTypes.STRING(20),
            allowNull:false,
        },
        Classification_address:{ // 분류 주소 ex) 화천
            type:DataTypes.STRING(100),
            allowNull:false,
        },
        address:{ // 상세 주소
            type:DataTypes.STRING(100),
            allowNull:false,
        },
        open_time:{ // 오픈시간
            type:DataTypes.STRING(40),
            allowNull:false,
        },
        close_time:{ // 영업종료시간
            type:DataTypes.STRING(40),
            allowNull:false,
        },
    },{
        define: {
            timestamps: true,
          }
    })
);