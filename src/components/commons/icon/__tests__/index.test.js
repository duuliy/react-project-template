import { shallow } from 'enzyme'
import Icon from '../index'

describe('Icon <Icon />', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(<Icon name="file" fill='black' style={{ marginLeft: 100 }} />)
  })

  it('1 + 1 = 2', () => {
    expect(1+2).toBe(3);
  })
})

// "testRegex": "(/__tests__/.*|(\\.|/)(test))\\.[jt]sx?$"

// "jest": {
//   "roots": [
//     "<rootDir>/src/"
//   ],
//     "setupFilesAfterEnv": [
//       "<rootDir>/enzyme.config.js"
//     ],
//       "setupFiles": [
//         "mock-local-storage"
//       ],
//         "collectCoverage": true,
//           "globals": {
//     "CONFIG_ENV": true
//   },
//   "collectCoverageFrom": [
//     "src/pages/**/*.{js,jsx,ts,tsx}",
//     "!src/pages/**/*.test.{js,jsx,ts,tsx}",
//     "src/commponents/**/*.{js,jsx,ts,tsx}",
//     "!src/commponents/**/*.test.{js,jsx,ts,tsx}"
//   ],
//     "coverageThreshold": {
//     "global": {
//       "statements": 90,
//         "branches": 90,
//           "functions": 90,
//             "lines": 90
//     }
//   },
//   "moduleDirectories": [
//     "node_modules",
//     "src"
//   ],
//     "moduleFileExtensions": [
//       "ts",
//       "tsx",
//       "js",
//       "jsx",
//       "json"
//     ],
//       "testPathIgnorePatterns": [
//         "/node_modules/",
//         "/lib/",
//         "/esm/",
//         "/dist/"
//       ],
//         "transform": {
//     "^.+\\.(js|jsx)$": "<rootDir>/node_modules/babel-jest",
//       "^.+\\.css$": "<rootDir>/testBuild/cssTransform.js",
//         "^(?!.*\\.(js|jsx|css|json)$)": "<rootDir>/testBuild/fileTransform.js"
//   },
  // "moduleNameMapper": {
  //   "\\.(local.less)$": "identity-obj-proxy",
  //     ".*\\.(css|less|styl|scss|sass)$": "<rootDir>/testBuild/styleMock.js",
  //       ".*\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)": "<rootDir>/testBuild/fileMock.js",
  //         "@": "<rootDir>/src",
  //           "@assets": "<rootDir>/src/assets",
  //             "@components": "<rootDir>/src/components",
  //               "@public": "<rootDir>/public",
  //                 "@services": "<rootDir>/src/services",
  //                   "@stores": "<rootDir>/src/stores",
  //                     "@utils": "<rootDir>/src/utils"
  // },
//   "transformIgnorePatterns": [
//     "/node_modules/"
//   ],
//     "testMatch": [
//       "**/__tests__/**/*.js?(x)"
//     ]
// },

      // "@services/(.*)": "<rootDir>/src/services/$1",
      // "@utils/(.*)": "<rootDir>/src/utils/$1"

// "testRegex": "src/.*\\.test\\.js$",