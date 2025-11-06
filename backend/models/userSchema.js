import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    role: {
        type: String,
        enum: ["hotel", "volunteer"],
        required: [true, "Please Select one Role"]
    },
    name: {
        type: String,
        required: [true, "Please Provide Your Name"],
        minLength: [3, "Name must contain at least 3 characters"],
        maxLength: [30, "Name cannot exceed 30 characters"]
    },
    mobile: {
        type: String,
        unique: true,
        required: [true, "Please Provide Mobile no."],
        minLength: [10, "Mobile number must be 10 digits"],
        maxLength: [10, "Mobile number must be 10 digits"]
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Please Provide Your Email"],
        validate: [validator.isEmail, "Please Provide a Valid Email"]
    },
    age: {
        type: Number,
        validate: {
            validator: function (v) {
                return Number.isInteger(v) && v >= 0;
            },
            message: '{VALUE} is not a valid age'
        },
    },
    address: {
        type: String,
        required: function() {
            return this.role === 'hotel';
        },
        validate: {
            validator: function(v) {
                // If volunteer and no address provided, skip validation
                if (this.role === 'volunteer' && !v) return true;
                // If address is provided, check length (for both roles)
                if (v) return v.length >= 20 && v.length <= 100;
                // If hotel role, address is required (handled by 'required' field)
                return true;
            },
            message: 'Address must be between 20-100 characters'
        }
    },
    pincode: {
        type: String,
        required: function() {
            return this.role === 'hotel';
        },
        validate: {
            validator: function(v) {
                // If volunteer and no pincode provided, skip validation
                if (this.role === 'volunteer' && !v) return true;
                // If pincode is provided, validate format (6 digits, first digit 1-9)
                if (v) return /^[1-9]\d{5}$/.test(v);
                // If hotel role, pincode is required (handled by 'required' field)
                return true;
            },
            message: 'Pincode must be a valid 6-digit number'
        }
    },
    city: {
        type: String,
        required: [true, 'Please provide a city name'],
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, 'Password is Required'],
        minLength: [8, "Password must contain at least 3 characters"],
        maxLength: [32, "Password cannot exceed 32 characters"],
        select: false
    },
    badge: {
        type: String,
        enum: ['Diamond', 'Platinum', 'Gold', 'Silver', 'Bronze', "Spark", null],
        default: function () {
            return this.role === 'volunteer' ? "Spark" : null;
        }
    },
    point: {
        type: Number,
        default: function () {
            return this.role === 'volunteer' ? 0 : 5;
        }
    },
    ndrive: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

//hashing the pasword
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next()
    }
    this.password = await bcrypt.hash(this.password, 10);
});

//comparing passswrod
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

//generating a jwt token for authorization
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

export const User = mongoose.model("user", userSchema);
