import UserModel from '../../models/User';

export default async function handler(req, res) {
  console.log(req.body)
  let admincheck = await UserModel.findOne({email: req.body.email})
  if(admincheck.role !== 'superadmin'){
    res.status(401).json({ message: 'You are not authorized as Super Admin', emails: [] });
  } else {
    if(req.body.flag === 'getOrg'){
      const user = await UserModel.findOne({email: req.body.email});
      const all = await UserModel.find({});
      let orgEmails = [];
      all.forEach((element) => {
        if(element.email !== req.body.email)
          orgEmails.push(element.email);
      })
      user.organization.forEach((element) => {
        orgEmails = orgEmails.filter((item) => item !== element.email);
      })
      res.status(200).json({ organization: user.organization, emails: orgEmails });
    } else if(req.body.flag === "updateOrg") {
       const user = await UserModel.findOne({email: req.body.userEmail});
       const self = await UserModel.findOneAndUpdate({email: req.body.email}, {
          $push: {
            organization: {
              username: user.username,
              email: user.email,
              role: user.role,
              sales: user.sales,
              organization: user.email.trim().split('@')[1].split('.')[0].toUpperCase()
            }
          },
       });
       const result = await UserModel.findOneAndUpdate({email: req.body.userEmail}, { role: 'admin' });
       console.log(result.role)
       res.status(200).json({ message: 'Organization updated' });
    }  else if(req.body.flag === "removeOrg") {
          let emailsToRemove = req.body.userEmail;
          emailsToRemove.forEach(async (element) => {
            const self = await UserModel.findOneAndUpdate({email: req.body.email},
              { $pull: { organization: { email: element } } },
              { multi: true });
          })
          const result = await UserModel.findOneAndUpdate({email: req.body.userEmail}, { role: 'user' });
          console.log(result.role)
          res.status(200).json({ message: 'Members removed' });
     }
  }
}